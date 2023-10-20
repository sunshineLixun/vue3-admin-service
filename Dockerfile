FROM node:18-alpine

# 创建工作目录
RUN mkdir -p /app

# 指定工作目录
WORKDIR /app

# 复制当前代码到/app工作目录
COPY package.json .

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npm.taobao.org/

# npm 安装依赖
RUN npm install

# 复制其余的文件到容器内
COPY . .

# 打包
RUN npm run build

# 设置node环境变量
ENV NODE_ENV production

# 指定容器需要暴露的端口
EXPOSE 9003

# 启动服务
CMD npm run start:prod


