#!/bin/bash

# เช็คจำนวนอาร์กิวเมนต์ที่รับเข้ามา
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    # แสดงอาร์กิวเมนต์ที่ส่งเข้ามา
    for arg in "$@"; do
        echo "$arg"
    done
fi

