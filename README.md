# Vimeo Pro Directus extension

Directus extension that adds an interface to select videos from your Vimeo Pro account.

### Usage

1. Clone this repo into your project folder.
2. Run

```bash
cd directus-vimeopro
npm install
npm run build
```

3. Add A volume to the directus container in your `docker-compose.yml`

```yaml
volumes:
  - ./directus-vimeopro/dist:/directus/extensions/interfaces/directus-vimeopro
```

4. Add a singleton collection called `options` in your directus project and add a field `vimeopro_api_key`.
5. Create a new Vimeo Pro API token under `https://developer.vimeo.com/` and add it to the option field.
6. Add the field to your project
