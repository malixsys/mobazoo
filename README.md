# mobazoo ![build status](https://circleci.com/gh/malixsys/mobazoo.svg?&style=shield&circle-token=0c8d7f988d80f6f1a405a1a86b0b1ccf9b91a420) 

Next.js 3.0 starter project with React/Redux and Auth


## How to use

### Setup

Install it:

```bash
npm install
```

### Development

* Rename `.env.example` to `.env`
 
* Run the auto-updating server:

```bash
npm run dev
```

## Deployment

### Now
```bash
now --public -e API_BASE_URL=https://mobazoo.now.sh malixsys/mobazoo
```
or
```bash
now --public -e API_BASE_URL=<YOUR_SERVER> 
```

### Heroku

Deploy it:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/malixsys/mobazoo/tree/master)

Configure it:

```bash
heroku config:set API_BASE_URL=<YOUR_SERVER>
```

## Demo

https://mobazoo.herokuapp.com
https://mobazoo.now.sh
 
## Management
CircleCI: https://circleci.com/gh/malixsys/mobazoo
Heroku: https://dashboard.heroku.com/apps/mobazoo
Zeit: https://zeit.co/dashboard

## TODO

* PWA
