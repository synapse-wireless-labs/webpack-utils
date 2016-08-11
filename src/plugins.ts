export interface PluginManagerConfig {
  base: any[];
  production: any[];
  development: any[];
}

const defaultConfig: PluginManagerConfig = {
  base: [],
  production: [],
  development: []
};

export class PluginManager {
  private _basePlugins: any[] = [];
  private _productionPlugins: any[] = [];
  private _developmentPlugins: any[] = [];

  constructor(config: PluginManagerConfig = defaultConfig) {
    this._basePlugins = config.base;
    this._productionPlugins = config.production;
    this._developmentPlugins = config.development;
  }

  use(plugin: any) {
    this._basePlugins = [ ...this._basePlugins, plugin ];

    return this;
  }

  useInProduction(plugin: any) {
    this._productionPlugins = [ ...this._productionPlugins, plugin ];

    return this;
  }

  useInDevelopment(plugin: any) {
    this._productionPlugins = [ ...this._developmentPlugins, plugin ];

    return this;
  }

  export(production: boolean = false) {
    if (production) {
      return [
        ...this._basePlugins,
        ...this._productionPlugins
      ];
    }

    return [
      ...this._basePlugins,
      ...this._developmentPlugins
    ];
  }
}
