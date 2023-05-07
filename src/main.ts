import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
//import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt+QHJqVk1mQ1VbdF9AXnNAdFZzT2Baby8Nf1dGYl9RQXZaQ11gTn9bfkdkXw==;Mgo+DSMBPh8sVXJ1S0R+X1pCaVtdX2NLfUN/T2ZcdV1zZCQ7a15RRnVfR11mSH5QcURrUXtcdg==;ORg4AjUWIQA/Gnt2VFhiQlJPcEBGQmFJfFBmTGlcelRzd0U3HVdTRHRcQlhjTH9TdUJiUXdbdXI=;MTkzNTgxMEAzMjMxMmUzMjJlMzNQUE03TTA0VThZRE9SL0xuZFhOM25qWnlrWkFVU295VWpKTlpGYlZIWXhvPQ==;MTkzNTgxMUAzMjMxMmUzMjJlMzNnaDZ1dmFpLzVRS2RkZ2VlK1NBaGltcGkwNlBGdHdzWFlNNWN4YzlTMEhRPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfVldWXxLflF1VWpTelt6d1ZWESFaRnZdQV1mSXtSdkZkWHdXcnFT;MTkzNTgxM0AzMjMxMmUzMjJlMzNqRDZDaVprdVoycnBDWXVTZU80WElrTE84c3JNbkFpSFRSOUNoUEg2L2FjPQ==;MTkzNTgxNEAzMjMxMmUzMjJlMzNpaVZvS0RmSFFYT0NraFpnZmpBaWUwMDNmL3RlQTUzbytSSFZvOVdhd1JvPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPcEBGQmFJfFBmTGlcelRzd0U3HVdTRHRcQlhjTH9TdUJiUXZWdnI=;MTkzNTgxNkAzMjMxMmUzMjJlMzNsTFY0MjUrT2p0T1R5dllGVDhRYllOMG5zOG5idTVBb2kvSU90L1ZvcFBBPQ==;MTkzNTgxN0AzMjMxMmUzMjJlMzNuYjRUWHRSV3hLcTlpdWl5TzREYWVaRGFpb3ZUaWxDbFExWWxRa1luVkZNPQ==;MTkzNTgxOEAzMjMxMmUzMjJlMzNqRDZDaVprdVoycnBDWXVTZU80WElrTE84c3JNbkFpSFRSOUNoUEg2L2FjPQ==');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));*/
