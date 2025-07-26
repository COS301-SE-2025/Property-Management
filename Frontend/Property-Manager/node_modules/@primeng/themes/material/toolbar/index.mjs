// src/presets/material/toolbar/index.ts
var toolbar_default = {
  root: {
    color: "{content.color}",
    borderRadius: "{content.border.radius}",
    gap: "0.5rem",
    padding: "1rem"
  },
  colorScheme: {
    light: {
      root: {
        background: "{surface.100}",
        borderColor: "{surface.100}"
      }
    },
    dark: {
      root: {
        background: "{surface.800}",
        borderColor: "{surface.800}"
      }
    }
  }
};
export {
  toolbar_default as default
};
//# sourceMappingURL=index.mjs.map