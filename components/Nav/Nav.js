import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import logout from '../../utils/auth/logout';
import Router from 'next/router';

const Nav = (props) => {
  const { AuthUserInfo } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  return (
    <>
      <Menu secondary>
        <Menu.Item name="Home" className="home-btn" href="/" />

        <Dropdown
          text="Collectibles"
          pointing
          className="link item collectibles-btn"
        >
          <Dropdown.Menu>
            <Dropdown.Header>Museum Donations</Dropdown.Header>
            <Dropdown.Item href="/art">Art</Dropdown.Item>
            <Dropdown.Item href="/bugs">Bugs</Dropdown.Item>
            <Dropdown.Item href="/fish">Fish</Dropdown.Item>
            <Dropdown.Item href="/fossils">Fossils</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          name="characters"
          href="/characters"
          className="characters-btn"
        />
        <Dropdown text="DIY Recipies" pointing className="link item diy-btn">
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>
            <Dropdown.Item href="/equipment">Equipment</Dropdown.Item>
            <Dropdown.Item href="/houseware">Houseware</Dropdown.Item>
            <Dropdown.Item href="/misc">Miscellaneous</Dropdown.Item>
            <Dropdown.Item href="/others">Others</Dropdown.Item>
            <Dropdown.Item href="/tools">Tools</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <div className="login">
            {!AuthUser ? (
              <p>
                Greetings! Please sign in.{' '}
                <Button className="loginbutton" href={'/auth'}>
                  Sign In/Up
                </Button>
              </p>
            ) : (
              <div className="loggedin">
                <p className="loggedin-p">Welcome back {AuthUser.email}!</p>

                <Button
                  className="loginbutton"
                  onClick={async () => {
                    try {
                      await logout();
                      Router.push('/');
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Log out
                </Button>
              </div>
            )}
          </div>
        </Menu.Item>
      </Menu>
      <style jsx global>{`
        @font-face {
          font-family: FinkHeavy;
          src: url(fonts/FinkHeavy.otf) format('opentype');
        }

        .ui.secondary.menu {
          font-family: FinkHeavy !important;
        }

        .ui.secondary.menu .item.home-btn {
          background-color: #539e0e;
          border-radius: 25px;
          padding: 12px;
          border-color: brown;
          border-style: solid;
          border-width: 0 3px 3px 0;
          box-shadow: 1px 5px #888888;
          font-size: 1.5rem;
          color: white;
        }

        .collectibles-btn:hover,
        .characters-btn:hover,
        .diy-btn:hover {
          transform: scale(0.95) !important;
          box-shadow: 1px 5px rgba(0, 0, 0, 0.24) !important;
          z-index: 999;
        }

        .ui.secondary.menu .item.home-btn:hover {
          background-color: #539e0e;
          color: white;
          transform: scale(0.95) !important;
          box-shadow: 1px 5px rgba(0, 0, 0, 0.24) !important;
          z-index: 999;
        }

        .collectibles-btn {
          background-color: pink !important;
          border-radius: 25px !important;
          padding: 12px !important;
          border-color: brown !important;
          border-style: solid !important;
          border-width: 0 3px 3px 0 !important;
          box-shadow: 1px 5px #888888 !important;
          font-size: 1.5rem;
          color: white !important;
        }

        .characters-btn {
          background-color: #f09b51 !important;
          border-radius: 25px !important;
          padding: 12px !important;
          border-color: brown !important;
          border-style: solid !important;
          border-width: 0 3px 3px 0 !important;
          box-shadow: 1px 5px #888888 !important;
          font-size: 1.5rem;
          color: white !important;
        }

        .diy-btn {
          background-color: #cb94ff !important;
          border-radius: 25px !important;
          padding: 12px !important;
          border-color: brown !important;
          border-style: solid !important;
          border-width: 0 3px 3px 0 !important;
          box-shadow: 1px 5px #888888 !important;
          font-size: 1.5rem;
          color: white !important;
        }

        .ui.button.loginbutton {
          background-color: #e6dc81;
          border-radius: 25px;
          padding: 10px;
          border-color: brown;
          border-style: solid;
          border-width: 0 3px 3px 0;
          box-shadow: 1px 5px #888888;
          font-size: 1.5rem;
          color: white;
          margin-left: 5px;
        }

        .ui.secondary.menu {
          position: absolute;
          bottom: 0;
          margin-left: 15px;
        }

        .login {
          background-color: #cc9067;
          border-radius: 25px;
          padding: 10px;
          color: white;
        }

        .loggedin,
        .loggedin-p {
          display: inline-block;
        }
        .ui.menu .ui.dropdown .menu {
          background-color: white;
        }
      `}</style>
    </>
  );
};

const mockFetchData = async (userId) => ({
  user: {
    ...(userId && {
      id: userId,
    }),
  },
});

Nav.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
  // The AuthUserInfo object is available on both the server and client.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  // You can also get the token (e.g., to authorize a request when fetching data)
  // const AuthUserToken = get(AuthUserInfo, 'token', null)

  // You can fetch data here.
  const data = await mockFetchData(get(AuthUser, 'id'));

  return {
    data,
  };
};

Nav.displayName = 'Nav';

Nav.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};

Nav.defaultProps = {
  AuthUserInfo: null,
};

export default withAuthUser(withAuthUserInfo(Nav));
