# Contributing to Property Management Backend

Welcome! 🎉  
This document explains how to safely contribute to the project while using **Flyway** for database migrations.

---

## 🚀 Development Guidelines

- Always work on a feature branch.
- Open Pull Requests (PRs) for any changes.
- Keep commits small, meaningful, and related to a single change.

---

## 🗄 Database Migration Rules (Flyway)

> **Once a migration file has been applied, it must never be edited.**

Flyway tracks migration history using checksums. Changing existing files after they are applied will break Flyway and require manual intervention.

---

### ✅ How to create a new migration

1. Create a new file inside the `migrations/` directory.
2. Use the versioned naming format:


> Example:
> ```
> V3__create_image_meta_table.sql
> V4__add_foreign_key_to_maintenancetask.sql
> V5__rename_user_table.sql
> ```

3. Write only valid SQL statements in the file.
4. Always increment the version number based on the highest existing migration.

---

### ✅ Applying migrations locally

Use the provided Makefile commands:

```bash
make docker-flyway-migrate

