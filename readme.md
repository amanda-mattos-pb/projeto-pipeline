Projeto k8s com gitlab pipeline

Equipe

Amanda Laryssa Rodrigues de Mattos

Objetivo
Configurar uma pipeline que automatize o processo de build e push das imagens docker para o dockehub, e deploy em uma instância EC2 na AWS utilizando o kind.

Requisitos

Uma instância EC2 na aws com as portas 80 e 22 liberadas, kind, kubectl e gitlab-runner devidamente configurados.
Runner criado no gitlab e registrado no runner da instância EC2;
Variáveis DOCKERHUB_USER, DOCKERHUB_PASS e KUBE_CONFIG criadas no gitlab. #devem ser configuradas no gitlab


Estrutura do projeto

.
├── backend                 # arquivos de imagem do backend
│   ├── app.py
│   ├── Dockerfile
│   ├── models.py
│   └── requirements.txt
├── frontend                # arquivos de imagem do frontend
│   ├── Dockerfile
│   ├── ...
│   └── vite.config.js
├── devops                     # arquivos do projeto kubernates
│   ├── backend
│   ├── database
│   ├── frontend
│   ├── ingress
│   ├── namespace.yaml
│   └── README.md
├── kind-config.yaml        # arquivo de configurações do kind
└── README.md



Passo a passo


Na instância EC2, crie um cluster usando o  kind-config.yaml disponibilizado no repositório:

# Cria o cluster a ser usado pelo kubectl
kind create cluster --config kind-config.yaml # GARANTA QUE O ARQUIVO kind-config.yaml EXISTE NO DIRETÓRIO




Em seguida pegue o conteúdo de ~/.kube/config na instância EC2 e o coloque na variável KUBE_CONFIG do gitlab:

# Mostra na tela as configurações do kubectl
cat ~/.kube/config

# Saída do comando
# apiVersion: v1
#   clusters:
# ...




Substitua o valor da variável VITE_API_URL em devops/backend/configmap.yaml com o endereço IP público de sua instância EC2;


Realize um push no repositório:

# Salva as alterações e envia para o repositório com o push
git add .
git commit -m "Mensagem de commit"
git push




Na instância EC2, inicialize o runner:

# Inicializa o runner (caso não esteja sendo executado)
gitlab-runner run




Após a conclusão os stages build_push_backend e build_push_frontend, inicie manualmente o stage de deploy no gitlab;


Acesse o endereço de IP público da máquina no seu navegador.