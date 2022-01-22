import styled from 'styled-components'

export const HeaderArea = styled.div`
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #ccc;

  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  }

  a {
    text-decoration: none;
  }

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;

    .logo-1,
    .logo-2,
    .logo-3 {
      font-size: 27px;
      font-weight: bold;
    }

    .logo-1 {
      color: red;
    }
    .logo-2 {
      color: green;
    }
    .logo-3 {
      color: blue;
    }
  }

  nav {
    padding: 10px 0;

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul {
      display: flex;
      align-items: center;
      height: 40px;
    }

    li {
      margin: 0 20px;

      a,
      button {
        outline: 0;
        border: 0;
        background: none;
        cursor: pointer;
        color: black;
        font-size: 14px;

        &:hover {
          color: #999;
        }

        &.button {
          background-color: #ff8100;
          border-radius: 4px;
          color: white;
          padding: 5px 10px;
        }

        &.button:hover {
          background-color: #e57706;
        }
      }
    }
  }
`
