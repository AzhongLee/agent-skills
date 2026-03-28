# TCC

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-sites
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-starred-namespace --tcc-site prod --page 1 --size 50
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc search-namespace "keyword" --tcc-site prod --scope all --page 1 --size 50

NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-config "namespace" --region CN
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc get-config "namespace" "config_name" --region CN --dir "/default"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-dir "namespace" --env ppe_xxx --tcc-site i18n-bd
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-meta-data --env ppe_xxx --tcc-site i18n-bd

NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc create-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --dir "/default" --description "demo config" --value "a: b"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc update-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --value "a: b"
# When the config belongs to a synced region group (for example CN + China-East),
# update-config automatically expands extend_regions and update_base_version to all existing copies in that group.
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc import-base-config "namespace" --config-ids "123,456" --target-env ppe_xxx --tcc-site i18n-bd

# create-config requires a non-empty --description and automatically falls back
# to the V2 service_id create API for former_tcc / tcc_v2 namespaces.
# update-config also falls back to the V2 service_id upsert API for
# former_tcc / tcc_v2 namespaces, using the requested --region and --dir.
# deploy-config also switches former_tcc / tcc_v2 namespaces to the TCC AG V2
# deploy path: config/upsert_deploy/v2 + deployment/list/base_info/step_info/operate.
# For unpublished former_tcc configs, V2 deploy expects the target latest version in region_confspace_version[].from_version, and remark should be written to config_data.note.
# In auto mode it keeps advancing "next" when no review is required; otherwise
# it returns the current review deployment for follow-up approval.

# Deploy config (default: --publish-mode auto, auto start + finish when no review needed)
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env ppe --tcc-site prod --region CN
# When the config belongs to a synced region group (for example CN + China-East),
# deploy-config automatically expands config_changes/check_review conf_ids to all existing copies in that group.

# Only create deployment, do not start (manual mode)
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --publish-mode manual

# Deploy with review support (auto mode): returns review info when review is needed
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env prod --tcc-site prod --region CN --publish-mode auto

# Force auto-publish regardless of review requirement
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env prod --tcc-site prod --region CN --publish-mode force-auto
```
