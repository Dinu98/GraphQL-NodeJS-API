#!/bin/bash
sequelize db:seed:undo:all
sequelize db:migrate:undo:all
rm -f storage/db.sqlite
touch storage/db.sqlite
sequelize db:migrate
sequelize db:seed:all