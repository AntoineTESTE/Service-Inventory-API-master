'use strict';

module.exports = ({ ReposModel }) => {
  return {
    getAll(request, reply) {
      ReposModel.getAll()
        .then(repos => reply(repos))
        .catch(err => reply(err));
    }
  }
}
