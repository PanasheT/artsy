import { Session } from './src/modules/session/session';
import main from './src/main';

export const SESSION = Session.getInstance();

(async () => await main())();
