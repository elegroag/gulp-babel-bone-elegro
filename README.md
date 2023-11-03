# Project GULP - Browserify - BACKBONEJS

Comandos iniciales para transpilar el proyecto

```bash
mkdir dist
mkdir components
npm install
npm install gulp-cli -g
```

Run GULP

```bash
gulp dependencies
gulp browserify:dev
gulp serve
```

## Emascript es2015

Hacemos uso de Emascript es2015 para Babel, donde usamos el .babelrc con es2015 en preset       
Configure user setting .vscode

```json
 "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
  },
```
