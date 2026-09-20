export function getDeviceId(): string {
  if (typeof window === "undefined") return "server_device";
  let deviceId = localStorage.getItem("studyflash_device_id");
  if (!deviceId) {
    deviceId = "dev_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    localStorage.setItem("studyflash_device_id", deviceId);
  }
  return deviceId;
}
