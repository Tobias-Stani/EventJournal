FROM php:8.2-apache

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        libzip-dev \
        zlib1g-dev \
        unzip \
        libicu-dev \
        libssh2-1 \
        libssh2-1-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql pcntl zip calendar \
    && pecl install ssh2-1.4.1 \
    && docker-php-ext-enable ssh2

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
