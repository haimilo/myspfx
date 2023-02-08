import { LogLevel } from "@pnp/logging";
import { PnPLogging } from "@pnp/logging";
import { WebPartContext } from "@microsoft/sp-webpart-base";
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";


var _sp: SPFI = null;

// SPFI will create an obj to reuse throughout all our web part

export const getSP = (context?: WebPartContext): SPFI => {
    if (_sp === null && context != null) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _sp;
};
