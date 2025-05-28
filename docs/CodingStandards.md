# Coding Standards

## Formatting Tools and Configurations

### Prettier
We use Prettier for code formatting to ensure consistency across different files and contributors for all our Typescript project.

## Git Conventions

### Branch Naming Rules
Branches in our repository are divided into two types of branches:
- `Backend/xxx`: Features to be added to the backend springboot server
- `Frontend/xxx`: Features to be added to our angular project

## File Structure
Our repository follows a monorepo structure, with each part of the project defined
in a sub-folder in the root of the project:

```
├── Backend       <---- Spring boot API
├── Frontend  <---- Angular frontend
```

## Conclusion
Adhering to these coding standards and conventions will help ensure that our codebase remains clean, consistent, and maintainable. These guidelines should be reviewed and updated as necessary to accommodate new tools or practices.
