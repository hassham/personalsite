# Editing the site with Pages CMS

Pages CMS edits the content files in this GitHub repository. Saving an entry creates a Git commit; the deployment workflow then builds the site and publishes the generated files to the existing S3 bucket.

## Connect Pages CMS once

1. Open https://app.pagescms.org and sign in with GitHub.
2. Install the Pages CMS GitHub App.
3. Grant it access only to the `hassham/personalsite` repository.
4. Open the repository in Pages CMS and select the `main` branch.

The editor reads `.pages.yml` automatically and shows two sections: **Writing** and **Work**.

## Publish an article

1. Open **Writing** and choose **New entry**.
2. Add the title, URL slug, description, category, date, reading time and article body.
3. Leave **Published** enabled when the article is ready to appear publicly.
4. Save the entry.

The article page, Writing list and recent-writing section on the homepage are generated automatically.

## Update selected work

Open **Work**, choose an entry, edit its summary, tags or detail points, then save. The Work page and homepage cards update from the same content.

## Local checks

Use `pnpm build` to generate the site and `pnpm validate` to check links, assets, analytics and the Pages CMS configuration before publishing code changes.
