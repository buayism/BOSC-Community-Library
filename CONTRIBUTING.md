# Contributing to BOSC Community Library

Thank you for your interest in contributing to the **BOSC Community Library**! This document provides detailed instructions to help external contributors get started.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Fork the Repository](#how-to-fork-the-repository)
- [Creating a Branch](#creating-a-branch)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code Style Guidelines](#code-style-guidelines)
- [Reporting Issues](#reporting-issues)
- [Community Standards](#community-standards)

## Getting Started

1. Ensure you have a [GitHub](https://github.com) account.
2. Familiarize yourself with the project by reading the [README.md](README.md).
3. Review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the standards we expect from all contributors.

## How to Fork the Repository

A fork is your own copy of the repository where you can make changes without affecting the original project.

1. Navigate to the main repository page of **BOSC-Community-Library**.
2. Click the **Fork** button in the upper-right corner of the page.
3. Select your personal GitHub account or organization as the destination.
4. Wait for the forking process to complete. You will be redirected to your new fork.

### Cloning Your Fork Locally

After forking, clone your copy to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/BOSC-Community-Library.git
cd BOSC-Community-Library
```

Add the upstream repository as a remote to keep your fork synchronized:

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/BOSC-Community-Library.git
git fetch upstream
```

## Creating a Branch

All changes should be made on a dedicated branch. Never commit directly to the `main` branch of your fork.

1. Ensure your local `main` branch is up to date:

```bash
git checkout main
git pull upstream main
```

2. Create a new branch with a descriptive name:

```bash
git checkout -b feature/your-feature-name
```

Use the following naming conventions:

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feature/` | `feature/add-search-functionality` |
| Bug fix | `fix/` | `fix/login-validation-error` |
| Documentation | `docs/` | `docs/update-installation-guide` |
| Refactoring | `refactor/` | `refactor/simplify-api-client` |

3. Make your changes and commit them with clear, descriptive messages:

```bash
git add .
git commit -m "feat: add advanced search filters to library index"
```

## Making Changes

- Keep your changes focused and atomic. Each pull request should address a single concern.
- Write clear, self-documenting code and add comments where necessary.
- Update or add tests to cover your changes.
- Update relevant documentation (README, inline docs, etc.) to reflect your changes.
- Run all existing tests to ensure no regressions were introduced.

## Submitting a Pull Request

Once your changes are complete and tested, push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

Then, open a Pull Request (PR) on the original repository:

1. Navigate to the original **BOSC-Community-Library** repository.
2. Click the **Pull requests** tab, then click **New pull request**.
3. Click **compare across forks** and select your fork and branch.
4. Fill out the PR template completely, including:
   - A clear description of the changes
   - Links to any related issues
   - Confirmation that tests pass and documentation is updated
5. Click **Create pull request**.

### After Submitting

- Monitor your PR for feedback from maintainers.
- Respond to review comments promptly and make requested changes.
- If changes are requested, commit them to the same branch and push again; the PR will update automatically.

## Code Style Guidelines

- Follow the existing code style and conventions used in the project.
- Use meaningful variable and function names.
- Keep functions small and focused on a single responsibility.
- Format your code consistently before committing.

## Reporting Issues

If you find a bug or have a feature request but are not ready to submit code:

1. Check the [existing issues](https://github.com/ORIGINAL_OWNER/BOSC-Community-Library/issues) to avoid duplicates.
2. Open a new issue and complete the provided template with all relevant details.

## Community Standards

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inspiring community for everyone.

---

If you have any questions or need help, feel free to open an issue or reach out to the maintainers. Happy contributing!
