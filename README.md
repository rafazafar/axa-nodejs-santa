# Nodejs Santa App

A minimal Nodejs app for AXA Coding Challenge.

Santa is now accepting gift requests ! Woohoo!

Multiple wishes will be sent at 15 second intervals until there are no wishes left.

## Screenshot

![Screenshot](https://i.ibb.co/P1BdmW2/Screenshot-2023-02-24-at-2-18-17.png)

## Requirements

- **Node:** 18.x

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. View `.env.example` file to get started.

`SMTP_USERNAME` : SMTP account username

`SMTP_PASSWORD` : SMTP account password

`SMTP_HOST` : SMTP host (eg. smtp.ethereal.email )

`SMTP_PORT` : SMTP port (eg. 587 )

## Run Locally

Clone the project

Install dependencies

```bash
npm install
```

Run development server ( watches for file changes )

```bash
npm run dev
```

OR

Run production server

```bash
npm start
```

Visit site at [http://localhost:3000](http://localhost:3000)

## API Reference

#### Send a wish to Santa

```http
  POST /wish
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
