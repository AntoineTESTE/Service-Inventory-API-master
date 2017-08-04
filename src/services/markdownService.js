'use strict';

const { markdown } = require('markdown');
const safeParse = require('safe-json-parse/callback')

module.exports = () => {
  return {
    parse(content, f) {
      const tree = markdown.parse(content);
      const dependenciesTitleIndex = _.findIndex(tree, branch => {
        if(!_.isArray(branch) || branch.length !== 3 || !_.isString(branch[2])) {
          return false;
        }
        return branch[2].toLowerCase() === 'dependencies';
      });
      console.log("tree[dependenciesTitleIndex + 1][1][1]", tree[dependenciesTitleIndex + 1][1][1]);
      safeParse(tree[dependenciesTitleIndex + 1][1][1], (err, res) => {
        console.log("err", err);
        console.log("res", res);
        f(err, res);
      });
    },

    fromREADME(data, currentRepo) {
      return data.reduce((m, entity) => {
        m.nodes.push(_.omit(entity, 'direction'));
        if (entity.direction === 'bi') {
          m.links.push(...[{
            source: currentRepo.name,
            target: entity.name,
            type: entity.type
          }, {
            source: entity.name,
            target: currentRepo.name,
            type: entity.type
          }]);
          return m;
        }

        const source = entity.direction === 'out' ? currentRepo.name : entity.name;
        const target = entity.direction === 'in' ? currentRepo.name : entity.name;
        m.links.push({
          source,
          target,
          href: entity.href
        });
        return m;
      }, { nodes: [currentRepo], links: [] });

    }
  }
}
