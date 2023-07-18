# 基础镜像
FROM nginx:alpine

# Nginx目录
ENV NGINX_PATH=/etc/nginx

# 部署目录
ENV DEPLOY_PATH=/usr/share/nginx/html

# 删除原有配置文件及代码文件
RUN rm -rf ${NGINX_PATH}/nginx.conf
RUN rm -rf ${NGINX_PATH}/conf.d
RUN rm -rf ${DEPLOY_PATH}/*

# 复制新的配置文件
COPY ./nginx/nginx.conf ${NGINX_PATH}/

# 复制证书
COPY ./nginx/cert/ ${NGINX_PATH}/cert/

# 复制源码
COPY ./dist/ ${DEPLOY_PATH}

# 可以通过 docker build -t journey-client . 来创建本地镜像
# 通过 docker run -dp 80:80 443:443 --rm journey-client 来运行此镜像