var npmProperties = require('../../../package.json');

module.exports =
  { title: 'Border Wall'
  , description: npmProperties.description
  , port: 3017
  , liveReloadPort: 3018
  , mute: false
  , showStats: false
  , size:
    { x: 600
    , y: 800
    }
  , analyticsId: 'UA-92110910-1'
  };
