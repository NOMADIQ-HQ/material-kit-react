import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { BuildingView } from 'src/sections/building';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Building - ${CONFIG.appName}`}</title>
      </Helmet>

      <BuildingView />
    </>
  );
}
