import { Edge } from 'edge.js';
import { readFile } from 'fs';
import { join } from 'path';

let edge = null;

export const config = ({ cache } = { cache: false }) => {
  edge = new Edge(cache);
};

export const engine = (req, res, next) => {
  /*
        |-------------------------------------------------------------------------------------------------
        | Override the app.render function so that we can use dot notation
        |-------------------------------------------------------------------------------------------------
        */

  const { render } = res;

  res.render = function _render(view, options, callback) {
    const self = this;

    render.call(self, view.replace(/\./gi, '/'), options, callback);
  };

  /*
        |-------------------------------------------------------------------------------------------------
        | Register the edge view engine
        |-------------------------------------------------------------------------------------------------
        */

  req.app.engine('edge', (filePath, options, callback) => {
    edge.mount(join(req.app.settings.views));

    readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        return callback(err);
      }

      return callback(null, edge.renderRawSync(content, options));
    });
  });

  /*
        |-------------------------------------------------------------------------------------------------
        | Set the app view engine
        |-------------------------------------------------------------------------------------------------
        */

  req.app.set('view engine', 'edge');

  next();
};
