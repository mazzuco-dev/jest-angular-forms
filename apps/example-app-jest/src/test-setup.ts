import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
import { registerAngularFormMatchers } from 'jest-angular-forms';

setupZonelessTestEnv();

registerAngularFormMatchers();
