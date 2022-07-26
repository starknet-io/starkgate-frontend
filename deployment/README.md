# Starknet faucet helm chart

## First time installation

1. Authenticate

```bash
gcloud auth login
```

2. Connect to production kubernetes cluster

```bash
gcloud container clusters get-credentials web-devs --region us-central1 --project starkware-dev
```

3. Deploy application using helm CLI.

#### Production

```bash
helm install starkgate starkware/webapp-general-helm \
--values deployment/production.yml \
--set-file configMap.frontend.envs=.env.production \
--namespace starkgate-mainnet \
--create-namespace \
--set frontend.image.tag=VERSION
```

> **Note:** Change image VERSION to the new git tag.

#### Goerli

```bash
helm install starkgate starkware/webapp-general-helm \
--values deployment/goerli.yml \
--set-file configMap.frontend.envs=.env.goerli \
--namespace starkgate-goerli \
--create-namespace \
--set frontend.image.tag=VERSION
```

#### Devnet

```bash
helm install starkgate starkware/webapp-general-helm \
--values deployment/devnet.yml \
--set-file configMap.frontend.envs=.env.goerli \
--namespace starkgate-devnet \
--create-namespace \
--set frontend.image.tag=VERSION
```

> **Note:** Change image VERSION to the new git tag.

## Upgrade (redeploy)

> **Note:** Upgrade only if you already run `helm install`

Upgrade starknet faucet helm chart.

1. Authenticate

```bash
gcloud auth login
```

### Production

```bash
helm upgrade starkgate starkware/webapp-general-helm \
--values deployment/production.yml \
--set-file configMap.frontend.envs=.env.production \
--namespace starkgate-mainnet \
--set frontend.image.tag=VERSION
```

### Goerli

```bash
helm upgrade starkgate starkware/webapp-general-helm \
--values deployment/goerli.yml \
--set-file configMap.frontend.envs=.env.goerli \
--namespace starkgate-goerli \
--set frontend.image.tag=VERSION
```

### Devnet

```bash
helm upgrade starkgate starkware/webapp-general-helm \
--values deployment/devnet.yml \
--set-file configMap.frontend.envs=.env.goerli \
--namespace starkgate-devnet \
--set frontend.image.tag=VERSION
```

## Rollback

To see revision numbers, run:

```bash
helm history starkgate-[ENV]
```

To rollback

```bash
helm rollback starkgate-[ENV] [REVISION]
```
