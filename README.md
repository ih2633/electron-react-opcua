<img src=".erb/img/gamen.png" width="100%" />

<br>



<br>

<div align="center">
<!-- 
sequenceDiagram
USER->>Electron: NodeID取得ボタン
Electron->>OpcUa Client: SessionData
OpcUa Client->>OpcUa Server: connect(SessionData)
OpcUa Server->>OpcUa Client: dissconnect(NodeIds)
OpcUa Client->>Electron: NodeIdTree
Electron->> USER: PublicNodeIdの一覧が表示される
USER->>Electron: PublicNodeIdから<br>モニターしたいNodeIdを選択<br>CONNECTボタン
Electron->>OpcUa Client: SessionData + <br>MonitorNodeIds
OpcUa Client->>OpcUa Server:connect(SessionData+<br>MonitorNodeIds)
loop ChangeMonitorItem
    OpcUa Server->>OpcUa Client: MonitorItem<br>[value]
    OpcUa Client->>Electron: MonitorItem<br>[value]
    Electron->>USER: モニターしたいNodeIdを監視
end
USER->>Electron: DISCONNECTボタン
Electron->>OpcUa Client: dissconnect
OpcUa Client->>OpcUa Server: dissconnect
OpcUa Server->>OpcUa Client: Status disconnect
OpcUa Client->>Electron: disconnect signal
Electron->>USER: モニター終了 
-->

[![](https://mermaid.ink/img/pako:eNqVVE1v00AQ_SvWnqgaGpJA2loolySHHJoi3F7AHDbetb2Ss2u860hVFAk7FRKkEhIS7QEE4kOFExeEVFUIfsy2JPwL1vl0SBpUn-yZ98Zv38xOG1gMYaADjh-HmFq4QqATwKZJ943q_ZulUtXDlggY1bW6AtYqly-OL3-eyO4bGf-S3W8mnQAUdte39qFW9gimQtcMzDlhtAIFNGk6NUUaOGjhQNcsRqkqciPFWJtQRpiF4ohwPqENhSG-tvCXf7SjvQDjOcFackhduxc2PGKNMDL6enH2ZHD6WUZHg_df-p_OZfRKxkcy7i3xZJ7Zk_Gzu42gJLsfZLc3NOiHjE5k9E5Gh2NQ_PJPdPb7-dsEV96t16vlvWuaqa1rCXmHUSJYMD78aoeXGLy-WEMZ6DHma2UXUgePczWB1TBo6lnZjxQ6KfywBb0QP0oTl3RlFSnlxKhJq03tv_44OD02KaZoSZsqNeMaXqdm6z-DuwR5hT-GgCLkCeGqyjO1M5DGiUOhN6d10Y3-9_ji_CnIgCYOmpAgdZvbiYkmEC5uYhPo6hVhG4aeMIFJOwoKQ8GMA2oBXQQhzoDQR1BMLj_QbejxabSKki5Ngx6DCKvPNhAHfrI6HMKFKqk028RJ4mHgqbArhM_1bDZJbzhEuGFjw2LNLCfIhYFwW9vFbDFf3IL5Ai5uFuCdQgFZjdz2lp2_nbPR5q1cHoJOJwN8SB8wNlOFh3p2RntruL46fwEZGtqg?type=png)](https://mermaid.live/edit#pako:eNqVVE1v00AQ_SvWnqgaGpJA2loolySHHJoi3F7AHDbetb2Ss2u860hVFAk7FRKkEhIS7QEE4kOFExeEVFUIfsy2JPwL1vl0SBpUn-yZ98Zv38xOG1gMYaADjh-HmFq4QqATwKZJ943q_ZulUtXDlggY1bW6AtYqly-OL3-eyO4bGf-S3W8mnQAUdte39qFW9gimQtcMzDlhtAIFNGk6NUUaOGjhQNcsRqkqciPFWJtQRpiF4ohwPqENhSG-tvCXf7SjvQDjOcFackhduxc2PGKNMDL6enH2ZHD6WUZHg_df-p_OZfRKxkcy7i3xZJ7Zk_Gzu42gJLsfZLc3NOiHjE5k9E5Gh2NQ_PJPdPb7-dsEV96t16vlvWuaqa1rCXmHUSJYMD78aoeXGLy-WEMZ6DHma2UXUgePczWB1TBo6lnZjxQ6KfywBb0QP0oTl3RlFSnlxKhJq03tv_44OD02KaZoSZsqNeMaXqdm6z-DuwR5hT-GgCLkCeGqyjO1M5DGiUOhN6d10Y3-9_ji_CnIgCYOmpAgdZvbiYkmEC5uYhPo6hVhG4aeMIFJOwoKQ8GMA2oBXQQhzoDQR1BMLj_QbejxabSKki5Ngx6DCKvPNhAHfrI6HMKFKqk028RJ4mHgqbArhM_1bDZJbzhEuGFjw2LNLCfIhYFwW9vFbDFf3IL5Ai5uFuCdQgFZjdz2lp2_nbPR5q1cHoJOJwN8SB8wNlOFh3p2RntruL46fwEZGtqg)

</div>
