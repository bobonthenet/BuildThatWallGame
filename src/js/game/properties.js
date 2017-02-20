var npmProperties = require('../../../package.json');

module.exports =
  { title: 'Build That Wall'
  , description: npmProperties.description
  , port: 3017
  , liveReloadPort: 3018
  , mute: false
  , showStats: false
  , size:
    { x: 727
    , y: 600
    }
  , analyticsId: 'UA-92110910-1'
  };
