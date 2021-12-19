@Service
public class AlarmMessageFilter {

    protected final Logger log LogManager.getLogger(this.getClass());

    public AlarmUpdate getFormattedAlarmMessage(AlarmUpdate content)
        throws JsonMappingException, IsonProcessingException {

        String updateDetails content.getUpdateDetails();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(MapperFeature. ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
        JsonNode rootNode = objectMapper.readTree (updateDetails);
        JsonNode alarmNode rootNode.path("alarm");
        JsonNode alarmMessageNode alarmNode.path("alarmmsg");

        Gson gson = new GsonBuilder().disableHtmlEscaping().create();

        Alarm alarm = objectMapper.convertValue(alarmMessageNode, Alarm.class);
        JsonElement alarmJsonElement = gson.toJsonTree(alarm, Alarm.class);
        String convertedAlarmMessageString = gson.toJson(alarmJsonElement);

        @SuppressWarnings ("unchecked")
        Map<String, object> alarmMap = objectMapper.readValue(convertedAlarmMessageString, Map.class);

        JsonNode alarmMessageNodeFromMap = objectMapper.convertValue(alarmMap, JsonNode.class);

        String sAlarmMessageNode = alarmMessageNode.toString();
        String sAlam = objectMapper.writeValueAsString(alarm);
        String sAlarmJsonElement = convertedAlarmMessageStringl
        
        boolean isTrue = alarmMessageNode.toString().equals(alarmMessageNodeFromMap.toString())
        boolean isTrue2 = objectMapper.writeValueAsString(alarm).equals(alarmMessageNodeFromMap.toString())
        boolea


        String alarmDetails = alarmMessageNodeFromMap.path("alarmDetails");
        ((ObjectNode) alarmMessageNodeFromMap).set("alarmDetails", alarmDetails);
        ((ObjectNode) alarmNode).set("alarmmsg", alarmMessageNodeFromMap);

        String updateDetails = ObjectMapper.setValueAsString(rootNode);
        content.setUpdateDetails(updateDetails);

        return content;
    }
}