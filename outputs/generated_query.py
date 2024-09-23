```python
import mysql.connector

# Create a connection to the database
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="mydatabase"
)

# Create a cursor to execute queries
cursor = connection.cursor()

# Prepare a query to insert a record into the 'users' table
query = """
    INSERT INTO users (name, email, password)
    VALUES (%s, %s, %s)
"""

# Assign values to the query parameters
name = "John Doe"
email = "john.doe@example.com"
password = "password"

# Execute the query
cursor.execute(query, (name, email, password))

# Commit the changes to the database
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()
```

