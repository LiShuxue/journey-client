# 基础镜像
FROM nginx:stable

# 定义Nginx目录
ENV WORK_PATH /etc/nginx

# 定义代码目录
ENV CODE_PATH /usr/share/nginx/html

# 定义log目录，此处并没有用，方便以后查找
ENV LOG_PATH /var/log/nginx

# 删除原有配置文件及代码文件
RUN rm -rf $WORK_PATH/nginx.conf
RUN rm -rf $WORK_PATH/conf.d
RUN rm -rf $CODE_PATH/*

# 复制新的配置文件
COPY ./nginx/nginx.conf $WORK_PATH/

# 复制证书
COPY ./nginx/cert/ $WORK_PATH/cert/

# 复制源码
COPY ./dist/ $CODE_PATH/

# 可以通过 docker build -t journey-client:latest . 来创建本地镜像
# 通过 docker run -itd --rm -p 8000:8000 --name nginx-test journey-client:latest 来运行此镜像来测试