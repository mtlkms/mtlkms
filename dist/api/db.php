<?php

namespace Database;

define('DB_HOST', 'localhost');
define('DB_NAME', 'mtlkms');
define('DB_USERNAME', 'mtlkms');
define('DB_PASSWORD', 'ckckckck');

class DBController {
    private static $conn;

    function hello() {
        echo "hello";
    }
    
    function connect() {
        if (!$this->conn) {
            // Connect
            $this->conn = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME) or die("[Database] Kết nối thất bại");
            
            // Set charset
            header("Content-type: text/html; charset=utf-8");
            mysqli_set_charset($this->conn, 'UTF8');
        }
    }
    
    function disconnect() {
        if ($this->conn) {
            mysqli_close($this->conn);
        }
    }
    
    function insert($table, $data) {
        $this->connect();
        
        $field_list = '';
        $value_list = '';
        
        foreach ($data as $key => $value) {
            $field_list .= ",$key";
            $value_list .= ",'" . $this->conn->real_escape_string($value) . "'";
        }
        
        $sql = 'INSERT INTO ' . $table . '(' . trim($field_list, ',') . ') VALUES (' .trim($value_list, ',') . ')';
        
        return $this->conn->query($sql);
    }
    
    function update($table, $data, $where) {
        $this->connect();
        
        $sql = '';
        
        foreach ($data as $key => $value) {
            $sql .= "$key = '" . $this->conn->real_escape_string($value) . "',";
        }
        
        $sql = 'UPDATE ' . $table . ' SET ' . trim($sql, ',') . ' WHERE ' . $where;
        
        return mysqli_query($this->conn, $sql);
    }
    
    function remove($table, $where) {
        $this->connect();
        
        $sql = "DELETE FROM $table WHERE $where";
        return mysqli_query($this->conn, $sql);
    }
    
    function get_list($sql) {
        $this->connect();
        
        $result = mysqli_query($this->conn, $sql);
        
        if (!$result) die('[Database class - get_list] Truy vấn sai');
        
        $return = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
            $return[] = $row;
        }
        
        mysqli_free_result($result);
        return $return;
    }
    
    function get_row($sql) {
        $this->connect();
        
        $result = mysqli_query($this->conn, $sql);
        
        if (!$result) die('[Database class - get_row] Truy vấn sai');
        
        $row = mysqli_fetch_assoc($result);
        
        mysqli_free_result($result);
        
        if ($row) return $row;
        return false;
    }
}