```python3  
    from google.cloud import bigquery

    # Construct a BigQuery client object.
    client = bigquery.Client()

    query = """
        SELECT
            cdr.patient_id,
            cdr.device_id,
            cdr.measurement_date,
            cdr.measurement_type,
            cdr.measurement_value,
            cdr.measurement_unit,
            cdr.source_name,
            cdr.source_version
        FROM
            `bigquery-public-data.google_health_dataset.cdr` AS cdr
    """
    query_job = client.query(query)  # Make an API request.

    df = query_job.to_dataframe()
    df.head()  
```

