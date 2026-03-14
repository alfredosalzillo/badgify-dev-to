# Badgify Dev.to

Generate [Dev.to](http://dev.to) badges for your GitHub profile, personal website, and more.

## Badges

### User Badge
Showcase your Dev.to profile with a beautiful badge.

You can customize the theme by adding the `theme` query parameter. Available options are `light` (default) and `dark`.

#### Markdown
```markdown
<!-- Replace {username} with your dev.to username -->
[![Dev to profile {username}](https://badgify-dev-to.alfredosalzillo.vercel.app/badges/user?username={username}&theme=dark)](https://dev.to/{username})
```

#### HTML
```html
<!-- Replace {username} with your dev.to username -->
<a href="https://dev.to/{username}">
  <img alt="Dev to profile" src="https://badgify-dev-to.alfredosalzillo.vercel.app/badges/user?username={username}&theme=dark" />
</a>
```

### Examples

#### Light Theme (default)
[![Dev to profile alfredosalzillo](https://badgify-dev-to.alfredosalzillo.vercel.app/badges/user?username=alfredosalzillo)](https://dev.to/alfredosalzillo)

#### Dark Theme
[![Dev to profile alfredosalzillo](https://badgify-dev-to.alfredosalzillo.vercel.app/badges/user?username=alfredosalzillo&theme=dark)](https://dev.to/alfredosalzillo)

## Features
-   🖼️ Dynamic profile image fetching.
-   ⚡ Built with Next.js for high performance and caching.
-   🎨 Clean SVG output, perfect for READMEs.
-   🌓 Light and Dark theme support.

## Contributing
Contributions are welcome! If you have any ideas or find a bug, please open an issue or a pull request.

## License
This project is licensed under the MIT License.
