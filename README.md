[![Build Status](https://travis-ci.org/KowalskiProject/kowalski-react-frontend.svg?branch=master)](https://travis-ci.org/KowalskiProject/kowalski-react-frontend)

# Quick Start
```shell
yarn install
KOWALSKI_API_BASE_URL='<http/https>://<kowalski_host>:<kowalski_port' yarn run start
```

# Deployment in production using Docker
```shell
SATURNO_VERSION="SOME_VERSION" KOWALSKI_API_BASE_URL="PRODUCTION_KOWALSKI_API_URI" yarn run build
docker build . -t kowalski/saturno
docker run --rm -p 3443:443 -v /path/to/certificate.crt:/etc/nginx/ssl/certificate.crt -v /path/to/server.key:/etc/nginx/ssl/server.key kowalski/saturno
```

# Roadmap

* Fix current unit tests
* Setup CI/CD with unit tests coverage information being visible in the README.md
* Reach 90% coverage of unit tests
* Migrate codebase to Typescript
* Update react to 16.3+ and Redux to 4.0+

# Contribution Guidelines
  * Fork the project.
  * Branch master and start working on your feature.
  * Please, follow these [guidelines](https://chris.beams.io/posts/git-commit/) when writing commit messages.
  * Make sure your branch do not contain merge commits.
  * Open your PR!