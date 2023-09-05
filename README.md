# Vimeo Pro Directus extension

Extension that adds an interface to select videos from your Vimeo Pro account.

### Usage

1. Clone this repo in your root folder.
2. Add this volume top the directus container in your `docker-compose.yml`

```yaml
volumes:
  - ./directus-vimeopro/dist:/directus/extensions/interfaces/directus-vimeopro
```

3. Add a singleton collection called `options` in your directus project and add a field `vimeopro_api_key`.
4. Create a new Vimeo Pro API token under `https://developer.vimeo.com/` and add it to the option field.
5. Add the field to your project
