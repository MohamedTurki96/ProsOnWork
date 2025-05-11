export const getEmailLayout = () => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>
    <style>
      table,
      td,
      div,
      h1,
      p {
        font-family: Arial, sans-serif;
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; word-spacing: normal; background-color: #ffffff">
    <div role="article" aria-roledescription="email" style="margin: 0 auto; width: 92%; max-width: 600px">
      <table role="presentation" style="width: 100%; border: none; border-spacing: 0">
        <tr>
          <td style="text-align: center; padding: 0">
            <!--[if mso]
                     >
                     <table role="presentation" align="center" style="width:600px;">
                     <tr>
                     <td>
                     <![endif]
                     -->
            <table
              role="presentation"
              style="
                width: 94%;
                max-width: 600px;
                border: none;
                border-spacing: 0;
                text-align: left;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 22px;
                color: #363636;
              "
            >
              <tr>
                <td
                  style="
                    padding: 40px 0 10px 0;
                    border-bottom: 1px solid #a1a1aa;
                    text-align: left;
                    font-size: 24px;
                    font-weight: bold;
                  "
                >
                    <img
                      class="light-logo"
                      src="http://localhost:3000/logo.svg"
                      width="400"
                      alt="Logo"
                      style="
                        width: 400;
                        max-width: 80%;
                        height: auto;
                        border: none;
                        text-decoration: none;
                        color: #ffffff;
                      "
                    />
                </td>
              </tr>
            </table>
            <table
              role="presentation"
              style="
                width: 94%;
                max-width: 600px;
                border: none;
                border-spacing: 0;
                text-align: left;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 22px;
                color: #363636;
              "
            >
              <tr>
                <td style="padding: 30px 0">{{> @partial-block }}</td>
              </tr>
            </table>
            <table
              role="presentation"
              style="
                width: 94%;
                max-width: 600px;
                border: none;
                border-spacing: 0;
                text-align: left;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 22px;
                color: #363636;
              "
            >
            </table>
            <!--[if mso]
                     >
                     </td>
                     </tr>
                     </table>
                     <![endif]
                     -->
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`
