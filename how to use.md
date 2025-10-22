cd ~/Downloads
ssh -i "mtnge.pem" ubuntu@ec2-18-183-134-212.ap-northeast-1.compute.amazonaws.com
cd wedding-site/
node server.js
pm2 start server.js --name wedding-site
pm2 stop wedding-site





# 先备份默认首页（可选）
sudo cp -a /var/www/html/index.nginx-debian.html /var/www/html/index.bak 2>/dev/null || true

# 覆盖你的一套资源
sudo cp ~/wedding-site/index.html /var/www/html/
sudo cp ~/wedding-site/feather.png /var/www/html/
sudo cp ~/wedding-site/wedding.mp4 /var/www/html/

# 基本权限
sudo chmod 644 /var/www/html/index.html /var/www/html/feather.png /var/www/html/wedding.mp4

# 本机验证
curl -I http://127.0.0.1
