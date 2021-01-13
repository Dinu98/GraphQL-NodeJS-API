#!/bin/bash
rm -f storage/db.sqlite
touch storage/db.sqlite
sequelize db:migrate
sequelize db:seed:all