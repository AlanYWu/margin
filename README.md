# Margin — Marketing Site

Static landing page for **Margin**, an AI copilot for dealer-group CFOs that
answers every question with a verbatim quote and page citation from an OEM
accounting manual or NADA benchmark — or refuses on the record. Plain HTML /
CSS / JS, hosted on GitHub Pages.

**Live:** https://alanywu.github.io/margin/

The product code lives in a separate (private) monorepo: `dealer-cfo-copilot`.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Pushes to `main` are published automatically by GitHub Pages
(Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/` root).
