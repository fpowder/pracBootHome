package com.example.prac1.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @brief 사용자 정보를 담는 클래스
 */

public class UserInfo implements Serializable {

  private static final long serialVersionUID = 4572236666706851761L;
  private String id;
  private String tenantId;
  private String tenantName;
  @JsonIgnore
  private String password;
  private int enabled;
  private String name;
  private int protection;
  private String creator;
  private int accessTokenCount;
  private String email;
  private String contact;
  private Timestamp createdAt;
  @JsonIgnore
  private String sessionKey;
  private String affiliation;
  private String networkNodeIp;
  private int mountNodeCount;
  private String externalIp;
  private int master;
  private Timestamp login;
  private Boolean subscribe;
  private int invoice;
  @JsonIgnore
  private String newTenantId;
  private String type;
  @JsonIgnore
  private String billkey;
  private int kind;
  private String code;
  private String description;
  private int loginCount;
  private String newId;
  private Timestamp loginFailureTime;
  private String rgwSosPermission;
  private int credentialCount;
  private int rgwSosSuspended;
  private Timestamp latestPasswordUpdate;
  private Boolean passwordUpdateEnforce;
  private Timestamp changePasswordEmailTokenExpiryDate;
  private Timestamp changeOtpEmailTokenExpiryDate;
  public UserInfo() {
  }
  public UserInfo(String id) {
    this.id = id;
  }

  public static long getSerialVersionUID() {
    return serialVersionUID;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTenantId() {
    return tenantId;
  }

  public void setTenantId(String tenantId) {
    this.tenantId = tenantId;
  }

  public String getTenantName() {
    return tenantName;
  }

  public void setTenantName(String tenantName) {
    this.tenantName = tenantName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public int getEnabled() {
    return enabled;
  }

  public void setEnabled(int enabled) {
    this.enabled = enabled;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getProtection() {
    return protection;
  }

  public void setProtection(int protection) {
    this.protection = protection;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }

  public int getAccessTokenCount() {
    return accessTokenCount;
  }

  public void setAccessTokenCount(int accessTokenCount) {
    this.accessTokenCount = accessTokenCount;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getContact() {
    return contact;
  }

  public void setContact(String contact) {
    this.contact = contact;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public String getSessionKey() {
    return sessionKey;
  }

  public void setSessionKey(String sessionKey) {
    this.sessionKey = sessionKey;
  }

  public String getAffiliation() {
    return affiliation;
  }

  public void setAffiliation(String affiliation) {
    this.affiliation = affiliation;
  }

  public String getNetworkNodeIp() {
    return networkNodeIp;
  }

  public void setNetworkNodeIp(String networkNodeIp) {
    this.networkNodeIp = networkNodeIp;
  }

  public int getMountNodeCount() {
    return mountNodeCount;
  }

  public void setMountNodeCount(int mountNodeCount) {
    this.mountNodeCount = mountNodeCount;
  }

  public String getExternalIp() {
    return externalIp;
  }

  public void setExternalIp(String externalIp) {
    this.externalIp = externalIp;
  }

  public int getMaster() {
    return master;
  }

  public void setMaster(int master) {
    this.master = master;
  }

  public Timestamp getLogin() {
    return login;
  }

  public void setLogin(Timestamp login) {
    this.login = login;
  }

  public Boolean getSubscribe() {
    return subscribe;
  }

  public void setSubscribe(Boolean subscribe) {
    this.subscribe = subscribe;
  }

  public int getInvoice() {
    return invoice;
  }

  public void setInvoice(int invoice) {
    this.invoice = invoice;
  }

  public String getNewTenantId() {
    return newTenantId;
  }

  public void setNewTenantId(String newTenantId) {
    this.newTenantId = newTenantId;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getBillkey() {
    return billkey;
  }

  public void setBillkey(String billkey) {
    this.billkey = billkey;
  }

  public int getKind() {
    return kind;
  }

  public void setKind(int kind) {
    this.kind = kind;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getLoginCount() {
    return loginCount;
  }

  public void setLoginCount(int loginCount) {
    this.loginCount = loginCount;
  }

  public String getNewId() {
    return newId;
  }

  public void setNewId(String newId) {
    this.newId = newId;
  }

  public Timestamp getLoginFailureTime() {
    return loginFailureTime;
  }

  public void setLoginFailureTime(Timestamp loginFailureTime) {
    this.loginFailureTime = loginFailureTime;
  }

  public String getRgwSosPermission() {
    return rgwSosPermission;
  }

  public void setRgwSosPermission(String rgwSosPermission) {
    this.rgwSosPermission = rgwSosPermission;
  }

  public int getCredentialCount() {
    return credentialCount;
  }

  public void setCredentialCount(int credentialCount) {
    this.credentialCount = credentialCount;
  }

  public int getRgwSosSuspended() {
    return rgwSosSuspended;
  }

  public void setRgwSosSuspended(int rgwSosSuspended) {
    this.rgwSosSuspended = rgwSosSuspended;
  }

  public Timestamp getLatestPasswordUpdate() {
    return latestPasswordUpdate;
  }

  public void setLatestPasswordUpdate(Timestamp latestPasswordUpdate) {
    this.latestPasswordUpdate = latestPasswordUpdate;
  }

  public Boolean getPasswordUpdateEnforce() {
    return passwordUpdateEnforce;
  }

  public void setPasswordUpdateEnforce(Boolean passwordUpdateEnforce) {
    this.passwordUpdateEnforce = passwordUpdateEnforce;
  }

  public Timestamp getChangePasswordEmailTokenExpiryDate() {
    return changePasswordEmailTokenExpiryDate;
  }

  public void setChangePasswordEmailTokenExpiryDate(Timestamp changePasswordEmailTokenExpiryDate) {
    this.changePasswordEmailTokenExpiryDate = changePasswordEmailTokenExpiryDate;
  }

  public Timestamp getChangeOtpEmailTokenExpiryDate() {
    return changeOtpEmailTokenExpiryDate;
  }

  public void setChangeOtpEmailTokenExpiryDate(Timestamp changeOtpEmailTokenExpiryDate) {
    this.changeOtpEmailTokenExpiryDate = changeOtpEmailTokenExpiryDate;
  }

  @Override
  public String toString() {
    return "UserInfo{" +
            "id='" + id + '\'' +
            ", tenantId='" + tenantId + '\'' +
            ", tenantName='" + tenantName + '\'' +
            ", password='" + password + '\'' +
            ", enabled=" + enabled +
            ", name='" + name + '\'' +
            ", protection=" + protection +
            ", creator='" + creator + '\'' +
            ", accessTokenCount=" + accessTokenCount +
            ", email='" + email + '\'' +
            ", contact='" + contact + '\'' +
            ", createdAt=" + createdAt +
            ", sessionKey='" + sessionKey + '\'' +
            ", affiliation='" + affiliation + '\'' +
            ", networkNodeIp='" + networkNodeIp + '\'' +
            ", mountNodeCount=" + mountNodeCount +
            ", externalIp='" + externalIp + '\'' +
            ", master=" + master +
            ", login=" + login +
            ", subscribe=" + subscribe +
            ", invoice=" + invoice +
            ", newTenantId='" + newTenantId + '\'' +
            ", type='" + type + '\'' +
            ", billkey='" + billkey + '\'' +
            ", kind=" + kind +
            ", code='" + code + '\'' +
            ", description='" + description + '\'' +
            ", loginCount=" + loginCount +
            ", newId='" + newId + '\'' +
            ", loginFailureTime=" + loginFailureTime +
            ", rgwSosPermission='" + rgwSosPermission + '\'' +
            ", credentialCount=" + credentialCount +
            ", rgwSosSuspended=" + rgwSosSuspended +
            ", latestPasswordUpdate=" + latestPasswordUpdate +
            ", passwordUpdateEnforce=" + passwordUpdateEnforce +
            ", changePasswordEmailTokenExpiryDate=" + changePasswordEmailTokenExpiryDate +
            ", changeOtpEmailTokenExpiryDate=" + changeOtpEmailTokenExpiryDate +
            '}';
  }
}
