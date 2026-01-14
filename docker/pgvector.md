# pgvector Docker Setup

## Docker Run Command

```bash
docker run -d -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin ankane/pgvector:latest
```

### Command Options
- `-d` - Run in detached mode (background)
- `-p 5432:5432` - Map port 5432 on host to 5432 in container
- `-e POSTGRES_USER=admin` - Set PostgreSQL user environment variable
- `-e POSTGRES_PASSWORD=admin` - Set PostgreSQL password environment variable
- `ankane/pgvector:latest` - The pgvector image

### Connection Details
- **Host:** localhost
- **Port:** 5432
- **Username:** admin
- **Password:** admin
