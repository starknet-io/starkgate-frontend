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
--values deployment/production.yaml \
--set-file configMap.backend.envs=packages/backend/.env.production \
--set-file configMap.frontend.envs=packages/frontend/.env.production \
--namespace starkgate \
--create-namespace \
--set frontend.image.tag=VERSION \
--set backend.image.tag=VERSION
```

> **Note:** Change image VERSION to the new git tag.

#### Testing

```bash
helm install starkgate starkware/webapp-general-helm \
--values deployment/testing.yaml \
--set-file configMap.backend.envs=packages/backend/.env.testing \
--set-file configMap.frontend.envs=packages/frontend/.env.testing \
--namespace starkgate-testing \
--create-namespace \
--set frontend.image.tag=VERSION \
--set backend.image.tag=VERSION
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
--values deployment/production.yaml \
--set-file configMap.backend.envs=packages/backend/.env.production \
--set-file configMap.frontend.envs=packages/frontend/.env.production \
--namespace starkgate \
--set frontend.image.tag=VERSION \
--set backend.image.tag=VERSION
```

### Testing

```bash
helm upgrade starkgate starkware/webapp-general-helm \
--values deployment/testing.yaml \
--set-file configMap.backend.envs=packages/backend/.env.testing \
--set-file configMap.frontend.envs=packages/frontend/.env.testing \
--namespace starkgate-testing \
--set frontend.image.tag=VERSION \
--set backend.image.tag=VERSION
```

## Rollback

To see revision numbers, run:

```bash
helm history starknet-faucet
```

To rollback

```bash
helm rollback starknet-faucet [REVISION]
```
