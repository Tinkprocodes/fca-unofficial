"use strict";

const utils = require("../utils");

module.exports = function (defaultFuncs, api, ctx) {
  return function changeAdminStatus(threadID, adminID, adminStatus) {
    if (utils.getType(threadID) !== "String") throw { error: "changeAdminStatus: threadID must be a string" };
    if (utils.getType(adminID) !== "String" && utils.getType(adminID) !== "Array") throw { error: "changeAdminStatus: adminID must be a string or an array" };
    if (utils.getType(adminStatus) !== "Boolean") throw { error: "changeAdminStatus: adminStatus must be true or false" };

    let wsContent = {
      request_id: 1,
      type: 3,
      payload: {
        version_id: '3816854585040595',
        tasks: [],
        epoch_id: 6763184801413415579,
        data_trace_id: null
      },
      app_id: '772021112871879'
    }

    if (utils.getType(adminID) === "Array") {
      for (let i = 0; i < adminID.length; i++) {
        wsContent.payload.tasks.push({
          label: '25',
          payload: JSON.stringify({ thread_key: threadID, contact_id: adminID[i], is_admin: adminStatus }),
          queue_name: 'admin_status',
          task_id: i + 1,
          failure_count: null
        });
      }
    }
    else {
      wsContent.payload.tasks.push({
        label: '25',
        payload: JSON.stringify({ thread_key: threadID, contact_id: adminID, is_admin: adminStatus }),
        queue_name: 'admin_status',
        task_id: 1,
        failure_count: null
      });
    }

    wsContent.payload = JSON.stringify(wsContent.payload);
    return new Promise((resolve, reject) => ctx.mqttClient && ctx.mqttClient.publish('/ls_req', JSON.stringify(wsContent), {}, (err, _packet) => err ? reject(err) : resolve()));
  };
};
