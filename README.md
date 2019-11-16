# ElasticSearch

![alt-text](https://www.clearscale.com/blog/content/images/2018/06/Live-Sync-from-MySQL-to-AWS-ElasticSearch---2.png)


- [x] **Setup CentOS 7 Virtual Machine**

```
- yum install elasticsearch
- service elasticsearch start
- service elasticsearch stop
```
To configure Elasticsearch to start automatically when the system boots up, run the following commands:
```
- /bin/systemctl daemon-reload
- /bin/systemctl enable elasticsearch.service
```
After running the above command, Elasticsearch can be started and stopped as follows:
```
- systemctl start elasticsearch.service
- systemctl stop elasticsearch.service
```
To check the status of Elasticsearch:
```
- service elasticsearch status
```
# CORS
To solve this issue, locate your Elasticsearch config file (For CentOS, it can be found at /etc/elasticsearch/elasticsearch.yml. For other operating systems, find out where it is located here) and add the following to the bottom of the file.
```
http.cors.enabled : true
http.cors.allow-origin : "*"
```
After that is done, restart your elasticsearch instance
```
service elasticsearch restart
```

# Run
```
npm run start
```
- Test the Server side search Navigate to http://localhost:3001/ (192.168.36.136:9200 local server static ip.),
