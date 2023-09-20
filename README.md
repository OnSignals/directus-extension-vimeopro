# Vimeo Pro Directus extension

Directus extension that adds an interface to select videos from your Vimeo Pro account.

Also check the [Directus Vimeo Pro display extension](https://github.com/OnSignals/directus-extension-vimeopro-display).

### Usage

1. Create the directory `/extensions/interfaces` in your project directory.
2. Clone this repo into `/extensions/interfaces`.
3. Run

```bash
cd extensions/interfaces/directus-extension-vimeopro
npm install
npm run build
```

4. Add a volume to the directus container in your `docker-compose.yml`

```yaml
volumes:
  - ./extensions/interfaces/directus-extension-vimeopro/dist:/directus/extensions/interfaces/directus-extension-vimeopro
```

5. Add or modify the `CONTENT_SECURITY_POLICY_DIRECTIVES__IMG_SRC` env variable in your directus instance to allow vimeo's thumbnails to be displayed in the UI

```bash
CONTENT_SECURITY_POLICY_DIRECTIVES__IMG_SRC="'self' data: blob: https://cdn.directus.io https://*.vimeo.com https://*.vimeocdn.com"
```

6. Add a singleton collection called `options` in your directus project and add a field `vimeopro_api_key`.
7. Create a new Vimeo Pro API token under `https://developer.vimeo.com/` and add it to the option field.
8. Add the field to your project
