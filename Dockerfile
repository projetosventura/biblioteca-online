FROM gvenzl/oracle-xe

COPY script.sql /docker-entrypoint-initdb.d/
