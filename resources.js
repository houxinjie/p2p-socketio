/*
 * 资源列表
 * [{socket, url, videoId}]
 */

let resources = [];
const _ = require('lodash');

const push = (socket, videoId, url) => {
    for(let i = 0, resource, length = resources.length; i < length; i++){
        resource = resources[i];
        if(resource.socket === socket && resource.videoId === videoId){
            return;
        }
    }
    resources.push({socket, videoId, url});
};

const remove = socket => {
    _.remove(resources, function(resource) {
        return resource.socket === socket;
    });
};

const query = videoId => {

    //随机算法
    const resource = _.findLast(resources, resource => resource.videoId === videoId);
    if(resource) return resource.url;

    return null;
};

const all = () => resources;


module.exports = {
    push,
    remove,
    query,
    all,
}
